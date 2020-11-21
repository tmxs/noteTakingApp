<?php

namespace App\Controller;

use DateTime;
use Exception;
use App\Entity\Note;
use App\Form\NoteType;
use App\Repository\TagRepository;
use App\Repository\NoteRepository;
use App\Repository\NotebookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Class NoteController
 *
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class NoteController extends AbstractController
{
    /**
     * @Route("/", name="notes_list")
     *
     * @param NoteRepository $notes
     *
     * @return Response
     */
    public function index(NoteRepository $notes)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $notes = $notes->findNotesByUser($this->getUser());
        return $this->render('default/index.html.twig', [
            'notes' => $notes,
        ]);
    }

    /**
     * @Route("/note/new", name="note_new")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param NoteRepository $notes
     *
     * @return RedirectResponse|Response
     * @throws Exception
     */
    public function new(Request $request, EntityManagerInterface $entityManager, NoteRepository $notes): Response
    {
        $note = new Note();
        $note->setCreationDate(new DateTime('now'));
        $note->setLastEdited(new DateTime('now'));
        $note->setAuthor($this->getUser());

        $form = $this->createForm(NoteType::class, $note);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if ($form->getData()->getTags()) {
                foreach ($form->getData()->getTags() AS $tag) {
                    $tag->setAuthor($this->getUser());
                }
            }

            $entityManager->persist($note);
            $entityManager->flush();

            return $this->redirectToRoute('notes_list');
        }

        return $this->render('notes/note_create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/note/edit/{id}", name="note_edit")
     *
     * @param Request $request
     * @param int $id
     * @param NoteRepository $notes
     * @param EntityManagerInterface $entityManager
     *
     * @return RedirectResponse|Response
     * @throws Exception
     */
    public function edit(Request $request, int $id, NoteRepository $notes, EntityManagerInterface $entityManager): Response
    {
        $note = $notes->find($id);
        if ($note->getAuthor() == $this->getUser()) {
            $form = $this->createForm(NoteType::class, $note);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $note->setLastEdited(new DateTime('now'));
                foreach ($form->getData()->getTags() AS $tag) {
                    $tag->setAuthor($this->getUser());
                }
                $entityManager->flush();

                return $this->redirectToRoute('notes_list');
            }
        } else {
            return $this->redirectToRoute('notes_list');
        }

        return $this->render('notes/note_edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/note/{id}", name="note_show")
     *
     * @param int $id
     * @param Request $request
     * @param NoteRepository $notes
     *
     * @return Response
     */
    public function show(int $id, Request $request, NoteRepository $notes): Response
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->redirectToRoute('notes_list');
        }

        $note = $notes->find($id);
        $data = [
            'code' => 200,
            'response' => $this->render('notes/note_content.html.twig', [
                    'note' => $note,
                ]
            )->getContent(),
        ];

        return $this->json($data);
    }

    /**
     * @Route("/note/delete/", name="note_delete")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param NoteRepository $notes
     *
     * @return Response
     */
    public function delete(Request $request, EntityManagerInterface $entityManager, NoteRepository $notes): Response
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->redirectToRoute('notes_list');
        }
        $note = $notes->find($request->get('noteId'));
        if ($note->getAuthor() == $this->getUser()) {
            $note->getTags()->clear();
            $entityManager->remove($note);
            $entityManager->flush();
            return $this->json('OK', 200);
        }
        return $this->json('You have no right to delete the note!', 403);
    }

    /**
     * @Route("/note/bookmark/", name="note_bookmark")
     *
     * @param Request $request
     * @param NoteRepository $notes
     *
     * @return Response
     */
    public function bookmarkNote(Request $request, NoteRepository $notes)
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->redirectToRoute('notes_list');
        }
        $note = $notes->find($request->get('bookmarkedNoteId'));
        $status = boolval($request->get('status'));
        $note->setFavourite($status);
        $this->getDoctrine()->getManager()->flush();

        return $this->json('OK', 200);
    }

    /**
     * Renders the Navigation bar.
     *
     * @param NotebookRepository $notebooks
     * @param NoteRepository $notes
     * @param TagRepository $tags
     *
     * @return Response
     */
    public function renderNavigationBar(NotebookRepository $notebooks, NoteRepository $notes, TagRepository $tags): Response
    {
        $user = $this->getUser();
        $recentNotes = $notes->findRecentNotes($user, 3);

        return $this->render('elements/navigation.html.twig', [
            'notebooks' => $notebooks->findBy([
                'author' => $user
            ]),
            'recentNotes' => $recentNotes,
            'bookmarkedNotes' => $notes->findBy([
                'author' => $user,
                'favourite' => true,
            ]),
            'tags' => $tags->findBy([
                'author' => $user
            ]),
        ]);
    }
}

<?php

namespace App\Controller;

use App\Entity\Notebook;
use App\Form\NotebookType;
use App\Repository\NoteRepository;
use App\Repository\NotebookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Controller used to manage notebooks.
 *
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class NotebookController extends AbstractController
{
    /**
     * @Route("/notebooks/{alias}", name="notebooks")
     *
     * @param string $alias
     * @param NoteRepository $notes
     * @param NotebookRepository $notebooks
     *
     * @return Response
     */
    public function index(string $alias, NoteRepository $notes, NotebookRepository $notebooks): Response
    {
        $notebook = $notebooks->findOneBy([
            'title' => $alias,
            'author' => $this->getUser()
        ]);
        $notesByNotebook = $notes->findByNotebook(
            $notebook,
            $this->getUser()
        );

        return $this->render('default/index.html.twig', [
            'notes' => $notesByNotebook,
        ]);
    }

    /**
     * Render list of notebooks
     *
     * @Route("/notebooks", name="notebook_list")
     *
     * @param NotebookRepository $notebooks
     *
     * @return Response
     */
    public function notebookList(NotebookRepository $notebooks): Response
    {
        return $this->render('notebooks/notebooks.html.twig', [
            'notebooks' => $notebooks->findBy([
                'author' => $this->getUser()
            ]),
        ]);
    }

    /**
     * Creates a new Notebook Entity
     *
     * @Route("/notebook/new", name="notebook_new")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     *
     * @return Response
     */
    public function notebookNew(Request $request, EntityManagerInterface $entityManager): Response
    {
        $notebook = new Notebook();
        $notebook->setAuthor($this->getUser());

        $form = $this->createForm(NotebookType::class, $notebook);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($notebook);
            $entityManager->flush();
        }

        return $this->redirectToRoute('notebook_list');
    }

    /**
     * @Route("/notebook/edit/{id}", name="notebook_edit")
     *
     * @param Request $request
     * @param int $id
     * @param NotebookRepository $notebooks
     * @param EntityManagerInterface $entityManager
     *
     * @return RedirectResponse|Response
     */
    public function notebookEdit(Request $request, int $id, NotebookRepository $notebooks, EntityManagerInterface $entityManager): Response
    {
        $notebook = $notebooks->find($id);
        $form = $this->createForm(NotebookType::class, $notebook);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            return $this->redirectToRoute('notebook_list');
        }

        return $this->render('notebooks/notebook_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/notebook/delete", name="notebook_delete")
     *
     * @param Request $request
     * @param NotebookRepository $notebooks
     * @param EntityManagerInterface $entityManager
     *
     * @return RedirectResponse|JsonResponse
     */
    public function notebookDelete(Request $request, NotebookRepository $notebooks, EntityManagerInterface $entityManager): Response
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->redirectToRoute('notes_list');
        }

        $notebook = $notebooks->find($request->get('noteId'));
        foreach ($notebook->getNotes() AS $note) {
            $entityManager->remove($note);
        }
        $entityManager->remove($notebook);
        $entityManager->flush();

        return $this->json('OK', 200);
    }

    /**
     * Used for rendering form on notebook list
     *
     * @param Request $request
     *
     * @return Response
     */
    public function notebookForm(Request $request): Response
    {
        $form = $this->createForm(NotebookType::class);

        return $this->render('notebooks/notebook_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

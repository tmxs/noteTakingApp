<?php

namespace App\Controller;

use App\Repository\TagRepository;
use App\Repository\NoteRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Controller used to manage tags.
 *
 * @IsGranted("IS_AUTHENTICATED_FULLY")
 */
class TagController extends AbstractController
{
    /**
     * @Route("/tags/{alias}", name="tags")
     *
     * @param string $alias
     * @param NoteRepository $notes
     *
     * @param TagRepository $tags
     * @return Response
     */
    public function index(string $alias, NoteRepository $notes, TagRepository $tags): Response
    {
        $tag = $tags->findOneBy([
            'title' => $alias
        ]);

        $notesByTag = $notes->findByTag($this->getUser(), $tag);

        return $this->render('default/index.html.twig', [
            'notes' => $notesByTag,
        ]);
    }

}

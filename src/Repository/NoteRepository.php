<?php

namespace App\Repository;

use App\Entity\Tag;
use App\Entity\Note;
use App\Entity\User;
use App\Entity\Notebook;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Note|null find($id, $lockMode = null, $lockVersion = null)
 * @method Note|null findOneBy(array $criteria, array $orderBy = null)
 * @method Note[]    findAll()
 * @method Note[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Note::class);
    }

    /**
     * Get all notes mapped to the given notebook
     *
     * @param Notebook $notebook
     * @param User $author
     *
     * @return Note[] Returns an array of Note objects
     */
    public function findByNotebook(Notebook $notebook, User $author)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.notebook = :notebook')
            ->andWhere('n.author = :author')
            ->setParameter('notebook', $notebook->getId())
            ->setParameter('author', $author->getId())
            ->orderBy('n.lastEdited', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @param User $user
     *
     * @return Note[]
     */
    public function findNotesByUser(User $user)
    {
        return $this->findBy(
            ['author' => $user->getId()],
            ['lastEdited' => 'desc']
        );
    }

    /**
     * Get array of notes for the given tag
     *
     * @param User $user
     * @param Tag $tag
     *
     * @return mixed
     */
    public function findByTag(User $user, Tag $tag)
    {
        return $this->createQueryBuilder('n')
            ->leftJoin('n.tags', 't')
            ->andWhere('n.author = :author')
            ->andWhere('t.id = :tag')
            ->setParameter('author', $user->getId())
            ->setParameter('tag', $tag->getId())
            ->orderBy('n.lastEdited', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get last edited notes
     *
     * @param User $author
     * @param int $maximum
     *
     * @return mixed
     */
    public function findRecentNotes(User $author, int $maximum)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.author = :author')
            ->setParameter('author', $author->getId())
            ->orderBy('n.lastEdited', 'DESC')
            ->setMaxResults($maximum)
            ->getQuery()
            ->getResult();
    }
}

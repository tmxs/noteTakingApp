<?php

namespace App\Repository;

use App\Entity\Notebook;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Notebook|null find($id, $lockMode = null, $lockVersion = null)
 * @method Notebook|null findOneBy(array $criteria, array $orderBy = null)
 * @method Notebook[]    findAll()
 * @method Notebook[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotebookRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Notebook::class);
    }
}

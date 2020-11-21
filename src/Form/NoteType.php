<?php

namespace App\Form;

use App\Entity\Note;
use App\Entity\Notebook;
use App\Form\Type\TagsInputType;
use App\Repository\NotebookRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class NoteType extends AbstractType
{
    private $notebookRepository;
    private $security;

    public function __construct(NotebookRepository $notebookRepository, Security $security)
    {
        $this->notebookRepository = $notebookRepository;
        $this->security = $security;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'max' => 100
                    ]),
                ],
            ])
            ->add('notebook', EntityType::class, [
                'class' => Notebook::class,
                'choice_label' => 'title',
                'choice_value' => 'id',
                'placeholder' => '-- Select a Notebook --',
                'choices' => $this->notebookRepository->findBy(['author' => $this->security->getUser()]),
                'required' => false,
            ])
            ->add('tags', TagsInputType::class, [
                'label' => false,
                'required' => false,
                'attr' => [
                    'class' => 'px-16',
                    'placeholder' => 'Add Tags',
                ],
            ])
            ->add('content', TextAreaType::class, [
                'required' => false,
                'constraints' => [
                    new NotBlank(),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Note::class
        ]);
    }

}

<?php

namespace App\Form\Type;

use App\Repository\TagRepository;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use App\Form\DataTransformer\TagArrayToStringTransformer;
use Symfony\Bridge\Doctrine\Form\DataTransformer\CollectionToArrayTransformer;

class TagsInputType extends AbstractType
{
    private $tags;

    public function __construct(TagRepository $tags)
    {
        $this->tags = $tags;
    }

    /**
     *
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->addModelTransformer(new CollectionToArrayTransformer(), true)
            ->addModelTransformer(new TagArrayToStringTransformer($this->tags), true);
    }

    /**
     *
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['tags'] = $this->tags->findAll();
    }

    /**
     *
     * {@inheritdoc}
     */
    public function getParent()
    {
        return TextType::class;
    }
}

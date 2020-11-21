<?php

namespace App\Form\DataTransformer;

use App\Entity\Tag;
use App\Repository\TagRepository;
use Symfony\Component\Form\DataTransformerInterface;

class TagArrayToStringTransformer implements DataTransformerInterface
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
    public function transform($tags): string
    {
        /* @var Tag[] $tags */
        return implode(',', $tags);
    }

    /**
     *
     * {@inheritdoc}
     */
    public function reverseTransform($string): array
    {
        if ('' === $string || null === $string) {
            return [];
        }

        $titles = array_filter(array_unique(array_map('trim', explode(',', $string))));

        $tags = $this->tags->findBy([
            'title' => $titles
        ]);
        $newTitles = array_diff($titles, $tags);
        foreach ($newTitles as $title) {
            $tag = new Tag();
            $tag->setTitle($title);
            $tags[] = $tag;
        }

        return $tags;
    }
}

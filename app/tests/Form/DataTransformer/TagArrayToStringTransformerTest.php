<?php

namespace App\Tests\Form\DataTransformer;

use App\Entity\Tag;
use PHPUnit\Framework\TestCase;
use App\Repository\TagRepository;
use App\Form\DataTransformer\TagArrayToStringTransformer;

class TagArrayToStringTransformerTest extends TestCase
{

   public function testCreateTheRightAmountOfTags()
    {
        $tags = $this->getMockedTransformer()->reverseTransform('Hello, Demo, How');

        $this->assertCount(3, $tags);
        $this->assertSame('Hello', $tags[0]->getTitle());
    }

    public function testCreateTheRightAmountOfTagsWithTooManyCommas()
    {
        $transformer = $this->getMockedTransformer();

        $this->assertCount(3, $transformer->reverseTransform('Hello, Demo,, How'));
        $this->assertCount(3, $transformer->reverseTransform('Hello, Demo, How,'));
    }

    public function testTrimNames()
    {
        $tags = $this->getMockedTransformer()->reverseTransform('   Hello   ');

        $this->assertSame('Hello', $tags[0]->getTitle());
    }

   public function testDuplicateNames()
    {
        $tags = $this->getMockedTransformer()->reverseTransform('Hello, Hello, Hello');

        $this->assertCount(1, $tags);
    }

    public function testUsesAlreadyDefinedTags()
    {
        $persistedTags = [
            $this->createTag('Hello'),
            $this->createTag('World')
        ];
        $tags = $this->getMockedTransformer($persistedTags)->reverseTransform('Hello, World, How, Are, You');

        $this->assertCount(5, $tags);
        $this->assertSame($persistedTags[0], $tags[0]);
        $this->assertSame($persistedTags[1], $tags[1]);
    }

    public function testTransform()
    {
        $persistedTags = [
            $this->createTag('Hello'),
            $this->createTag('World')
        ];
        $transformed = $this->getMockedTransformer()->transform($persistedTags);

        $this->assertSame('Hello,World', $transformed);
    }
    
    /**
     * @param array $findByReturnValues
     * 
     * @return TagArrayToStringTransformer
     */
    private function getMockedTransformer(array $findByReturnValues = []): TagArrayToStringTransformer
    {
        $tagRepository = $this->getMockBuilder(TagRepository::class)
            ->disableOriginalConstructor()
            ->getMock();
        $tagRepository->expects($this->any())
            ->method('findBy')
            ->willReturn($findByReturnValues);

        return new TagArrayToStringTransformer($tagRepository);
    }

    /**
     * @param string $title
     * 
     * @return Tag
     */
    private function createTag(string $title): Tag
    {
        $tag = new Tag();
        $tag->setTitle($title);

        return $tag;
    }
}

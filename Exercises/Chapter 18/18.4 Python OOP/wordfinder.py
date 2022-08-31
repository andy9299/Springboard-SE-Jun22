"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """Returns random words from a text file of words
    
    >>> test = WordFinder("test.txt")
    3 words read
    
    >>> test.random() in ["cat", "dog", "porcupine"]
    True
    
    """

    def __init__(self, path):
        """Reads text file of words and returns number of words"""
        word_stream = open(path)
        self.words = self.parse(word_stream)
        print(f"{len(self.words)} words read")
    
    def parse(self, word_stream):
        """Parse the file stream into a list of words"""
        return [word.strip() for word in word_stream]

    def random(self):
        """Returns random word"""
        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    """A special WordFinder that excludes blank lines and comments.
    
    >>> test = SpecialWordFinder("specialwords.txt")
    4 words read

    >>> test.random() in ["kale", "parsnips", "apple", "mango"]
    True
    """

    def parse(self, word_stream):
        """Parse file stream into a list of words skipping blanks and comments."""

        return [word.strip() for word in word_stream
                if word.strip() and not word.startswith("#")]

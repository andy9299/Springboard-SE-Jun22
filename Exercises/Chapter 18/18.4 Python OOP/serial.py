"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    
    def __init__(self, start=0):
        """Create a new SerialGenerator while saving the start and setting next"""
        self.start = self.next = start

    def __repr__(self):
        """How to display SerialGenerator"""
        return f"<SerialGenerator start={self.start} next={self.next}>"

    def generate(self):
        """Increment number and return it"""
        self.next += 1
        return self.next
    
    def reset(self):
        """Reset number to given start"""
        self.next = self.start


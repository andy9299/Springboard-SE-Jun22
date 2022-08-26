def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    # can make into separate function
    dict1 = {}
    dict2 = {}
    for digit in str(num1):
        dict1[digit] = dict1.get(digit, 0) + 1
    for digit in str(num2):
        dict2[digit] = dict2.get(digit, 0) + 1
    return dict1 == dict2

def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    nums_dict = {}
    for num in nums:
        nums_dict[num] = nums_dict.get(num, 0) + 1
    max_num = max(list(nums_dict.values()))
    for (num, freq) in nums_dict.items():
        if freq == max_num:
            return num
    return nums[0]
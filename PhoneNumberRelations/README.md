# Code Challenge - Phone Number relationse
------------

When you start to enter a phone number on your phone, the smartphone proposes you some choices of possible phone numbers from your repertory.

The goal of this kata is to save phone numbers and their relations to each other to be able to make these suggestions meanwhile you should try to keep the size of your repertory minimal.
In general the goal is to get this working within 1h30min try to document your decision making on the go you will have to present whatever you produced within the timeframe afterwards.


## Example:

We have the following phone numbers : 0123456789 0123987654 0123987456 2365498756 2365498765

This gives the following graphs :
```
                4 - 5 - 6 - 7 - 8 - 9
0 - 1 - 2 - 3 <
                \            4 - 5 - 6
                  9 - 8 - 7 <
                             6 - 5 - 4

                               6 - 5
2 - 3 - 6 - 5 - 4 - 9 - 8 - 7 <
                               5 - 6
```
The graphs contains 31 elements. So the function must return 31


### Bonus:
- Add a way of printing your graph
- Look at your code and try to optimize it in means of efficiency and/or complexity

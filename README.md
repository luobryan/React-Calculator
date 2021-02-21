# React Calculator

### Created by Bryan Luo 

## :pushpin: Description

This simple calculator was built as a coding challenge for an internship with Tutorfly. It was built with React. Due to the nature of the project, less attention was placed on the styling and more was placed on the Javascript logic. The calculator takes in a string which is inputted with the "buttons" of the calculator. It then parses
the string and evaluates the expression. It first uses a stack to convert the infix expression to posfix. Then, it uses another stack to converter from posfix to the actual answer. 

## :white_check_mark: Functionalities 

The calculator supports the 4 basic operators: addition, subtraction, multiplication and division \
It also supports exponents and decimal arithmetic. Furthermore, it supports \
PEMDAS order of operations.   

## Approaching the Problem & Thought Process

On a broad level, I divided the calculator into 3 components: the Calculator itself (App.js), \
the buttons (Button.js), and the screen (Screen.js). The screen is what shows the digits
you're putting in, and the buttons represent the buttons of an actual calculator. 

I maintain an "expression" and "result" in the state of the main App.js component. Every time a button is pressed,
I append the value of that butotn to the expression. If the button was "clear", then instead of appending, I
reset the state of "expression" and "result" to an empty string. If the button was "GO", then instaed of appending,
I reset evaluate the state of "expression" to an empty string, I clear the value of "expression", and I set
the state of "result" to the evaluated expression. 

As mentioned earlier, to evaluate the string, I first convert it from infix to posfix using a stack. Then I use 
another stack to convert it from posfix to an actual result. The pseudo-code was inspired by Carey Nachenberg's 
CS 32 class at UCLA, although there were some adjustment I had to make (which are elaborated on below in "Challenges")

## Challenges 

The main challenge was extracting the specific numbers, especially because there are decimals and negative signs.
However, I overcame this by performing the following logic (high level pseudo code):
If I reach a digit OR a negative sign that is not proceeded by a digit (i.e. it is a negative sign, not subtraction):
    Create another variable that keeps going forward until you hit a character that is not a digit
    or decimal point [this was done in a do-while loop, so if I started at a negative sign, it would at least run once]
Then, I could take the substring from wherever I am to wherever the other variable ends up at, in order
to get the number. 

## Next steps
If I were to expand this project further, I would add factorial and squart root features. On a high level,
I could implement square root by replacing all instances of sqrt(x) with x^0.5 (since my calculator already
supports exponents and decimals). I could implement factorial by replacing all instances of x! with 
(x*(x-1)*...*1), since my calculator already supports multiplication and PEMDAS order of opeartions (so it would 
prioritize everything in the parenthesis)

I would also handle certain semantics better. For example, 4(8) would not work on my calculator...you would have to
write 4*8 or 4*(8).

I would also handle error cases better. For many of the invalid expressions, my calculator either doesn't
do anything (and lets the user input a new expression) or crashes and freezes. If I put more time into this
project, I would do string validation or simply handle the error cases better. 

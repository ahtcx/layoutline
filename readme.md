Layoutline
==========
With layoutline.js find out what kind of keyboard layout your user has (among a list of layouts) just by swiping the keyboard characters in lines.

![usage](http://i.imgur.com/M6umvRS.png)

## Library

### Usage
Initialise the library to detect layouts in `layouts`, and set the maximum delay between chains (of keys) to `200`ms.
```
var layouts = [...],
	ll = new window.Layoutline(layouts, 200);
```
Wait for user to swipe beautiful lines across the keyboard, then you can retrieve the predicted layout.
```
> ll.getPredictedLayout()['name'];
"qwerty"
```
In this case our user supposedly has a qwerty keyboard.

### Layouts
Layouts are held in an array of objects, `[layout1, layout2, ...]`.

A layout object has a matrix of keys, a name, and offsets for each row of keys.
```
{
	"layout": [["f","i","r","s","t"],["s","e","c","o","n","d"], ...],
	"name": "example layout",
	"offsets": [0, 3]
}
```
This example layout would mean the keyboard ressembles the following.
```
[f][i][r][s][t]
         [s][e][c][o][n][d]
```
If there the same character is present more than once, the first one will used, whilst the others will be ignored.

Check out the `layouts.json` file to see some proper keyboard layouts.


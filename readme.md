Layoutline
==========
With layoutline.js find out what kind of keyboard layout your user has (among a list of layouts) just by swiping the keyboard characters in lines. [Try it out here](https://ahtcx.github.io/layoutline).

![usage](http://i.imgur.com/M6umvRS.png)

## Library

### Usage
Initialise the library to detect layouts in `layouts`, and set the maximum delay between chains (of keys) to `200`ms.
```
var layouts = [...],
	ll = new window.Layoutline(layouts, 200);
window.onkeypress = function(event) { ll.keyPressed(String.fromCharCode(event.which).toLowerCase(), ll) };
```
Wait for user to swipe beautiful lines across the keyboard, then you can retrieve the predicted layout.
```
> ll.getPredictedLayout()['name'];
"qwerty"
```
In this case our user supposedly has a qwerty keyboard.

For retrieving the layout, you could alternatively get the `layouts` object from an external `js`.

Then you only have to add another `script` tag to your `html` file and the variable `layouts` will be defined.
```
<script src="path/to/layouts.js"></script>
```

### Layouts
Layout objects are held in an array, `[layout1, layout2, ...]`. (Named `layouts` in the usage example above)

A layout object has a matrix of keys, a name, and offsets for each row of keys.
```
{
	"layout": [["f","i","r","s","t"],["s","e","c","o","n","d"]],
	"name": "example layout",
	"offsets": [0, 3]
}
```
The keys themselves are seen as on a grid and so with the offsets you can offset a certain row.

This example layout would mean the keyboard ressembles the following.
```
[f][i][r][s][t]
         [s][e][c][o][n][d]
```
If there the same character is present more than once, the first one will used, whilst the others will be ignored.

Check out the [`layouts.js`](layouts.js) file to see some proper keyboard layouts.


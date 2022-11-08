# ReactLearning

## Proptypes
- import PropTypes from 'prop-types' 
```
Navbar.prototype = {
    title: PropTypes.string.isRequired
}
```
- These are used to set datatype, to avoid mistakes

## DefaultProps
- These are set as default Props value, when props are not passed

```
Navbar.defaultProps = {
    aboutText: 'About'
}
```
## Hooks
- useState helps us to use class feature, witout creating class in functions
```
 // Declare a new state variable, which we'll call "text"
  const [text, setText] = useState('Enter the text here');
```
- The initial value of text is set to 'Enter the text here', to change the state, we use setText()
- We simiply can't change state value with assign value to text directly.
- Text is state and useState hooks is used,helps to create a state variable.

## Event Listner
- onChange event listener comes with an event
- `value `is followed by `onChange event`.

```
const handleOnChange = (event)=>{
        console.log('On Change')
        setText(event.target.value)
    }

<div>
    <textarea value={text} onChange={handleOnChange}></textarea>
</div> 
```
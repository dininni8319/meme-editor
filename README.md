const parent = document.querySelector('text-container')
    const element = document.createElement(elem.tag)
    element.innerText = 'Add Text'
    element.style.fontSize = elem.fontSize
    element.style.color = 'white'
    element.style.fontFamily = 'sans-serif'
    element.style.position = 'absolute'
    element.style.top = '50%'
    element.style.left = '50%'
    element.style.transform = 'translate(-50%, -50%)'
    element.style.zIndex = '100'
    element.style.cursor = 'pointer'
    element.style.userSelect = 'none'
    element.style.textAlign = 'center'
    element.style.textShadow = '2px 2px 2px black'
    element.style.fontWeight = 'bold'
    element.style.textDecoration = 'none'
    element.style.textTransform = 'uppercase'
    element.style.letterSpacing = '2px'
    element.style.lineHeight = '1.5'
    element.style.textShadow = '2px 2px 2px black'
    parent?.appendChild(element)

// write a function that gets all the videos inside the assets folder inside the video folder
// compress them
// then map through the array and display the videos
// when the user clicks on the video, it should be displayed on the canvas
// the user should be able to resize the video
// the user should be able to move the video around the canvas
// the user should be able to delete the video from the canvas
// the user should be able to add more videos to the canvas
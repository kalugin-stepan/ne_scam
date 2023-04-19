const step = 0.01

addEventListener('load', () => {
    const img = document.createElement('img')
    img.src = chrome.runtime.getURL('images/img.jpg')
    img.style.position = 'fixed'
    img.style.display = 'block'
    img.style.left = '50%'
    img.style.top = '50%'
    img.style.transform = 'translate(-50%, -50%)'
    img.style.opacity = '0'
    img.style.zIndex = '10000000000'
    img.style.pointerEvents = 'none'
    document.body.appendChild(img)

    function resize_img() {
        if (4*window.innerWidth < 5*window.innerHeight) {
            img.style.width = `${window.innerWidth}px`
            img.style.height = `${window.innerWidth*4/5}px`
        }
        else {
            img.style.width = `${window.innerHeight*5/4}px`
            img.style.height = `${window.innerHeight}px`
        }
    }

    window.onresize = resize_img

    resize_img()

    let opacity = 1

    function opacity_step() {
        opacity -= step
        for (const el of document.body.children) {
            el.style.opacity = opacity.toString()
        }
        img.style.opacity = (1 - opacity).toString()
        if (opacity <= 0) {
            opacity = 0
            for (const el of document.body.children) {
                el.style.opacity = opacity.toString()
            }
            img.style.opacity = (1 - opacity).toString()
            clearInterval(interval)
        }
    }

    let interval = setInterval(() => {
        opacity_step()
    }, 1000)
    addEventListener('mousemove', () => {
        opacity = 1
        opacity_step()
        if (!interval) {
            interval = setInterval(() => {
                opacity_step()
            }, 1000)
        }
    })      
})
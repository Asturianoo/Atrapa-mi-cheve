var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) 
{
    function setLandscape() 
    {
        if (screen.orientation) {
            screen.orientation.lock('landscape').catch(function(error) {
                console.error("Error locking orientation: ", error);
            });
        } else {
            // Fallback for browsers that don't support the Screen Orientation API
            document.body.style.transform = "rotate(90deg)";
            document.body.style.transformOrigin = "left top";
            document.body.style.width = "100vh";
            document.body.style.height = "100vw";
        }
        alert("Landscaping mobile view");
    }

    window.addEventListener('load', setLandscape);
    window.addEventListener('orientationchange', setLandscape);
}

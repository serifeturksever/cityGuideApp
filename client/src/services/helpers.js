export function notImplementedYet() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.querySelectorAll(".notImplemented");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    btn.forEach(val => {
        // When the user clicks on the button, open the modal
        val.onclick = function () {
            modal.style.display = "block";
        }
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
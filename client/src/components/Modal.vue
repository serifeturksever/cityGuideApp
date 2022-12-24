<template>
    <!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>This feature is not Implemented Yet!</h2>
            </div>
            <h4 style="color: grey">These are the some options for you to go</h4>
            <div class="modal-body">
                <ul class="modal-list">
                    <li>
                        <router-link to="/nearby-attractions">
                            1.) Nearby Attractions
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/public-transport-card">
                            2.) Public Transport Card
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            3.) Main Page
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.notImplementedYet();
    },
    methods: {
        notImplementedYet: function () {
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
    }
}
</script>

<style>
/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    padding-top: 200px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.7);
    /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 60%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

/* The Close Button */
.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #A5C9CA;
    color: white;
}

.modal-body {
    padding: 2px 16px;
}

.modal-list>li {
    list-style: none;
    font-size: 18px;
    margin-bottom: 8px;
}

.modal-list>li>a {
    color: black;
}
</style>
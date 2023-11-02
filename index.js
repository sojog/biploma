window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image1 = document.getElementById("reload1");
    let image2 = document.getElementById("reload2");
    let image3 = document.getElementById("reload3");
    let rotation = window.scrollY / 70;
image1.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation + "deg)";
image2.style.transform =
    "translate(-50%, -50%) rotate(" + rotation * 2 + "deg)";
image3.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation * 3 + "deg)";
}

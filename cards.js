$(() => {
    $(".about-card").each((index, element) => {
        $(element).on("mousemove", (e) => {
            // Interrupt mouseleave's transition, if it is in progress.
            $(element).css("transition", "");
            // Get the center of the element.
            let width = $(element).width();
            let height = $(element).height();
            let centerX = $(element).offset().left + width / 2;
            let centerY = $(element).offset().top + height / 2;
            // Fix for items further down the page rotating a bit too much.
            centerY -= $(window).scrollTop();
            // Calculate the distance of the pointer from the center of the element,
            // normalized to be between -1 and 1.
            let dx = (e.clientX - centerX) / (width / 2);
            let dy = (e.clientY - centerY) / (height / 2);
            // Y-axis is inverted in browsers (positive is down).
            dy = -dy;
            // Apply the transformation.
            $(element).css("transform", `rotateX(${dy * 15}deg) rotateY(${dx * 15}deg)`);
        });

        $(element).on("mouseleave", () => {
            $(element)
                .css("transition", "transform 0.5s")
                .css("transform", "rotateX(0deg) rotateY(0deg)")
                .on("transitionend", () => {
                    $(element).css("transition", "");
                });
        });
    });
});

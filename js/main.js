const Paint = {};

Paint.colors = ["black", "red", "blue", "green", "yellow", "magenta", "greenyellow", "lightblue"];
Paint.canvasBody = $('.canvas-body');
Paint.selectedColor = "black";

Paint.start = () => {
    Paint.bindOptions();
    Paint.createColorsPallet();
};

Paint.bindOptions = () => {
    const applianceBtnPencil = $('#pencil');
    const applianceBtnErase = $('#eraser');
    const applianceBtnClearCanvas = $('#clear-canvas');
    
    applianceBtnPencil.click(Paint.drawPencil);
    applianceBtnErase.click(Paint.erase);
    applianceBtnClearCanvas.click(Paint.clearCanvas);
};

Paint.createColorsPallet = () => {
    const colorsPallet = $('.colors-pallet');
    for (const color of Paint.colors) {
        $('<span/>')
            .addClass('color')
            .attr('id', color)
            .css('background-color', color)
            .appendTo(colorsPallet);

    }
    $('.color').click((event) => {
        Paint.selectedColor = $(event.target).attr('id');
    })
};

Paint.draw = (selectedAppliance, selectedColor, top, left) => {
    $('<span/>')
        .addClass(selectedAppliance)
        .css({
            'top': top,
            'left': left,
            'background-color': selectedColor
        })
        .appendTo(Paint.canvasBody);
};

Paint.drawPencil = () => {
    Paint.canvasBody.attr('class', 'canvas-body pencil');
    Paint.canvasBody.mousemove((e) => {
        if (e.buttons == 1) {
            const top = e.pageY - e.target.offsetTop;
            const left = e.pageX - e.target.offsetLeft;
            Paint.draw('pixel', Paint.selectedColor, top, left);
        };
    });
};

Paint.clearCanvas = () => {
    Paint.canvasBody
        .attr('class', 'canvas-body')
        .empty();

};

Paint.erase = () => {
    Paint.canvasBody.attr('class', 'canvas-body pencil');

};


Paint.start();


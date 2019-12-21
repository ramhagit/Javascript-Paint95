const Paint = {};

Paint.colors = ["black", "red", "blue", "green", "yellow", "magenta", "greenyellow", "lightblue"];
Paint.canvasBody = $('.canvas-body');
Paint.selectedColor = "black";
Paint.selectedShape = "";
Paint.clicking = false;

Paint.start = () => {
    Paint.bindOptions();
    Paint.createColorsPallet();
    Paint.userClicking();
};

Paint.bindOptions = () => {
    const applianceBtnPencil = $('#pencil');
    const applianceBtnBrush = $('#brush');
    const applianceBtnErase = $('#eraser');
    const applianceBtnClearCanvas = $('#clear-canvas');

    applianceBtnPencil.click(Paint.drawPencil);
    applianceBtnBrush.click(Paint.drawBrush);
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

Paint.userClicking = () => {

    Paint.canvasBody.live("mousedown", function () {
        Paint.clicking = true;
    });

    $(document).live("mouseup", function () {
        Paint.clicking = false;
    });
}

Paint.draw = (selectedShape, selectedColor, top, left) => {
    $('<span/>')
        .addClass(selectedShape)
        .css({
            'top': top,
            'left': left,
            'background-color': selectedColor
        })
        .appendTo(Paint.canvasBody);
};

Paint.wrapDraw = () => {
    Paint.canvasBody.mousemove((e) => {
        if (e.buttons == 1) {
            const top = e.pageY - e.target.offsetTop;
            const left = e.pageX - e.target.offsetLeft;
            Paint.draw(Paint.selectedShape, Paint.selectedColor, top, left);
        }
        else return;
    });
};

Paint.drawPencil = () => {
    Paint.canvasBody.attr('class', 'canvas-body pencil');
    Paint.selectedShape = 'pixel';
    Paint.wrapDraw();
};

Paint.drawBrush = () => {
    Paint.canvasBody.attr('class', 'canvas-body brush');
    Paint.selectedShape = 'dot';
    Paint.wrapDraw();
};

Paint.clearCanvas = () => {
    Paint.canvasBody
        .attr('class', 'canvas-body')
        .empty();

};

Paint.erase = () => {
    Paint.canvasBody.attr('class', 'canvas-body eraser');
    Paint.canvasBody.mousemove((e) => {
        if (e.buttons == 1) {
            Paint.canvasBody.children().hover((event) => {
                Paint.canvasBody.remove($(event.target));
            })
        };
    });

};


Paint.start();


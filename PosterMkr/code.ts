// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 300 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

async function fontLoader(officeHeader) {
    const fonts = officeHeader.getRangeAllFontNames(0, officeHeader.characters.length)
    for (const font of fonts) {
      await figma.loadFontAsync(font)
    }

    officeHeader.layoutAlign = "CENTER"
    officeHeader.fontName = { family: "Roboto", style: "Regular" };
    officeHeader.characters = "Office of Students’ Welfare"
    officeHeader.textAlignHorizontal= "CENTER"
}

figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'create') {
    const nodes: SceneNode[] = [];

    var rootframe = figma.createFrame();
    rootframe.rescale(10.8);
    rootframe.name = "Poster"

    // figma.currentPage.appendChild(rootframe);

    nodes.push(rootframe)

    const logo1 = figma.createRectangle();
    logo1.x = 30;
    logo1.y = 30;
    logo1.name = "College Logo"
    logo1.resize(240, 65);

    const logo2 = figma.createRectangle();
    logo2.x = 930;
    logo2.y = 30;
    logo2.name = "Chapter Logo"
    logo2.resize(120, 85);

    // fontLoader(officeHeader)
    // officeHeader.layoutAlign = "CENTER"
    // officeHeader.fontName = { family: "Roboto", style: "Regular" };
    // officeHeader.characters = "Office of Students’ Welfare"
    // officeHeader.textAlignHorizontal= "CENTER"

    const detailsFooter = figma.createRectangle();
    detailsFooter.x = 0;
    detailsFooter.y = 921;
    detailsFooter.name = "Details Footer"
    detailsFooter.fills = [{ type: 'SOLID', color: msg.color }]
    detailsFooter.resize(1080, 96);

    const handleFooter = figma.createRectangle();
    handleFooter.x = 0;
    handleFooter.y = 1017;
    handleFooter.name = "Handle Footer"
    handleFooter.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    handleFooter.resize(1080, 64);

    rootframe.appendChild(logo1)
    rootframe.appendChild(logo2)
    rootframe.appendChild(detailsFooter)
    rootframe.appendChild(handleFooter)

    // const officeHeader = figma.createText();

    // const fonts = officeHeader.getRangeAllFontNames(0, officeHeader.characters.length)
    // for (const font of fonts) {
    //   await figma.loadFontAsync(font)
    // }

    // officeHeader.layoutAlign = "CENTER"
    // officeHeader.fontName = { family: "Roboto", style: "Regular" };
    // officeHeader.characters = "Office of Students’ Welfare"
    // officeHeader.textAlignHorizontal= "CENTER"

    // rootframe.appendChild(officeHeader)


  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

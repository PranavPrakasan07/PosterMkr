// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if(msg.type === 'create'){
    const nodes: SceneNode[] = [];

    var rootframe = figma.createFrame();
    rootframe.rescale(10.8);

    // figma.currentPage.appendChild(rootframe);

    nodes.push(rootframe)

    const logo1 = figma.createRectangle();
    logo1.x = 30;
    logo1.y = 30;
    logo1.resize(240, 65);

    const logo2 = figma.createRectangle();
    logo2.x = 930;
    logo2.y = 30;
    logo2.resize(120, 85);

    rootframe.appendChild(logo1)
    rootframe.appendChild(logo2)
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

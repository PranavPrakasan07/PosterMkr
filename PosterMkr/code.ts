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

async function fontLoader(createText, fontsize, text, x=0) {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" })

  createText.characters = text

  createText.textAlignHorizontal = "CENTER"
  createText.layoutAlign = "CENTER"

  createText.fontSize = fontsize;

  if(x != 0){
    createText.x = x;
    createText.y = 1034;
  }
}

function makeFrame(frame, text, y, colored=false, rgb={ r: 1, g: 0.5, b: 0}) {
  frame.rescale(10.8);
  frame.appendChild(text)
  frame.opacity = 1;
  frame.name = "autolayout"
  frame.layoutMode = "VERTICAL"
  frame.y = y
  frame.layoutAlign = "CENTER"

  console.log(colored)

  if(colored == true){
    frame.fills = [{ type:'SOLID' , color: rgb }]
  }
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

    // var autolayoutFrame = figma.createFrame();
    // autolayoutFrame.rescale(10.8);
    // autolayoutFrame.name = "autolayout"
    // autolayoutFrame.layoutMode = "VERTICAL"
    // autolayoutFrame.primaryAxisAlignItems="SPACE_BETWEEN"

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

    const officeHeader = figma.createText();
    const chaptername = figma.createText();
    const technitude = figma.createText();
    const title = figma.createText();
    const speaker = figma.createText();
    const date = figma.createText();
    const time = figma.createText();
    const platform = figma.createText();
    const coord = figma.createText();
    const moreinfo = figma.createText();

    const gmail = figma.createText();
    const instagram = figma.createText();
    const facebook = figma.createText();
    const linkedin = figma.createText();

    // createText, x, y, fontsize, text  

    fontLoader(officeHeader, 40, 'Office of Students’ Welfare');
    fontLoader(chaptername, 60, 'ISA-VIT');
    fontLoader(technitude, 45, 'TECHNITUDE ON');
    fontLoader(title, 48, `Introduction to PCB Design and  
  Electronic Design Automation`);
    fontLoader(speaker, 44, 'By: Speaker Name');
    fontLoader(date, 30, '10th October 2021');
    fontLoader(time, 30, '10:00 AM');
    fontLoader(platform, 30, 'Google Meet');
    fontLoader(coord, 32, 'Student Coordinator Details: Adithya Samal +91 9940726436');
    fontLoader(moreinfo, 32, 'For more information contact: events.sw@vit.ac.in');

    fontLoader(gmail, 24, 'isa@vit.ac.in', 121);
    fontLoader(instagram, 24, 'isa_vit_', 402);
    fontLoader(facebook, 24, 'isavitchapter', 619);
    fontLoader(linkedin, 24, 'ISA - VIT', 907);

    rootframe.appendChild(gmail)
    rootframe.appendChild(instagram)
    rootframe.appendChild(facebook)
    rootframe.appendChild(linkedin)

    var officeHeaderFrame = figma.createFrame();
    var chapternameFrame = figma.createFrame();
    var technitudeFrame = figma.createFrame();
    var titleFrame = figma.createFrame();
    var speakerFrame = figma.createFrame();
    var dateFrame = figma.createFrame();
    var timeFrame = figma.createFrame();
    var platformFrame = figma.createFrame();
    var coodFrame = figma.createFrame();
    var moreInfoFrame = figma.createFrame();

    makeFrame(officeHeaderFrame, officeHeader, 136);
    makeFrame(chapternameFrame, chaptername, 204);
    makeFrame(technitudeFrame, technitude, 303);
    makeFrame(titleFrame, title, 408);
    makeFrame(speakerFrame, speaker, 583);
    makeFrame(dateFrame, date, 665);
    makeFrame(timeFrame, time, 725);
    makeFrame(platformFrame, platform, 785);
    makeFrame(coodFrame, coord, 925, true, msg.color);
    makeFrame(moreInfoFrame, moreinfo, 973, true, msg.color);

    rootframe.appendChild(officeHeaderFrame)
    rootframe.appendChild(chapternameFrame)
    rootframe.appendChild(technitudeFrame)
    rootframe.appendChild(titleFrame)
    rootframe.appendChild(speakerFrame)
    rootframe.appendChild(dateFrame)
    rootframe.appendChild(timeFrame)
    rootframe.appendChild(platformFrame)
    rootframe.appendChild(coodFrame)
    rootframe.appendChild(moreInfoFrame)
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

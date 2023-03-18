export const commentsGet = async (req, res, next) => {
  try {
    const comments = [
      {
        id: 1,
        user: {
          name: 'someUserName',
          avatar:
            'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'
        },
        timestamp: 1679074376483,
        img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=2400&h=-1&s=1',
        text: 'someText',
        subComments: [
          {
            id: 4,
            user: {
              name: 'someUserName1',
              avatar:
                'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'
            },
            timestamp: 1979037376483,
            text: 'someText1'
          },
          {
            id: 5,
            user: {
              name: 'someUserName2',
              avatar:
                'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'
            },
            timestamp: 14549074376483,
            text: 'someText2'
          }
        ]
      },
      {
        id: 2,
        user: {
          name: 'someUserName1',
          avatar:
            'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'
        },
        timestamp: 1579074372183,
        text: 'someText1',
        subComments: []
      },
      {
        id: 3,
        user: {
          name: 'someUserName2',
          avatar:
            'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'
        },
        timestamp: 1279074376483,
        text: 'someText2',
        subComments: []
      }
    ];

    res.json(comments);
  } catch (e) {
    next(e);
  }
};

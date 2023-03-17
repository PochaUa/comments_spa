export const commentsGet = async (req, res, next) => {
  try {
    const comments = [
      {
        user: {
          name: 'someUserName',
          avatar:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw1yhWvhTYxOuVsiHLRONTOa&ust=1679149643369000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMC6uoGW4_0CFQAAAAAdAAAAABAE'
        },
        timestamp: 'someDate',
        text: 'someText',
        subComments: [
          {
            user: {
              name: 'someUserName1',
              avatar:
                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw1yhWvhTYxOuVsiHLRONTOa&ust=1679149643369000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMC6uoGW4_0CFQAAAAAdAAAAABAE'
            },
            timestamp: 'someDate1',
            text: 'someText1'
          },
          {
            user: {
              name: 'someUserName2',
              avatar:
                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw1yhWvhTYxOuVsiHLRONTOa&ust=1679149643369000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMC6uoGW4_0CFQAAAAAdAAAAABAE'
            },
            timestamp: 'someDate2',
            text: 'someText2'
          }
        ]
      },
      {
        user: {
          name: 'someUserName1',
          avatar:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw1yhWvhTYxOuVsiHLRONTOa&ust=1679149643369000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMC6uoGW4_0CFQAAAAAdAAAAABAE'
        },
        timestamp: 'someDate1',
        text: 'someText1',
        subComments: []
      },
      {
        user: {
          name: 'someUserName2',
          avatar:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Fuser-avatar&psig=AOvVaw1yhWvhTYxOuVsiHLRONTOa&ust=1679149643369000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMC6uoGW4_0CFQAAAAAdAAAAABAE'
        },
        timestamp: 'someDate2',
        text: 'someText2',
        subComments: []
      }
    ];

    res.json(comments);
  } catch (e) {
    next(e);
  }
};

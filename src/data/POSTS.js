import {USERS} from './USERS';

export const POSTS = [
  {
    imageUrl:
      'https://images.pexels.com/photos/2913125/pexels-photo-2913125.jpeg',
    // 'https://www.pexels.com/photo/woman-standing-behind-trees-2913125/',
    // imageUrl:USERS[14].image,
    user: USERS[14].username,
    likes: 7858,
    caption: 'feelin pretty',
    profile_picture: USERS[14].image,
    comments: [
      {
        user: 'zerocook',
        comment: 'Wow!',
      },
      {user: 'nitish23', comment: 'Looking good maam'},
    ],
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/4006576/pexels-photo-4006576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    user: USERS[12].username,
    likes: 239,
    caption: 'cant imagine living without you babe!',
    profile_picture: USERS[12].image,
    comments: [
      {
        user: 'SunitaBaral',
        comment: 'Congratalason sir!',
      },
      {user: 'khadkaSudhir', comment: 'yesso mila na dai hamlai pani'},
      {
        user: 'madhur', comment:'congratulations!'
      }
    ],
  },
  {
    imageUrl:
      'https://th-thumbnailer.cdn-si-edu.com/SdKYWifCKfE2g8O-po_SO99hQ-Y=/1000x750/filters:no_upscale():focal(3126x2084:3127x2085)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/ec/e6/ece69181-708a-496e-b2b7-eaf7078b99e0/gettyimages-1310156391.jpg',
    user: USERS[3].username,
    likes: 2233,
    caption: 'he loves running',
    profile_picture: USERS[3].image,
    comments: [
      {
        user: 'vaidehiPyakurel',
        comment: 'beutiful',
      },
      {user: 'doglover22', comment: 'very good'},
    ],
  },
  {
    imageUrl:'https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960-735x459.png.webp',
    user: USERS[16].username,
    likes: 1129,
    caption: 'Cant wait to go back',
    profile_picture: USERS[16].image,
    comments: [
      {
        user: 'stupid',
        comment: 'I want to go with you next time',
      },
    ],
  },
];

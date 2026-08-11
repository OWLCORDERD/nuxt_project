export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const menuList = [
        {
          id: 1,
          homepageType: 'ADMIN',
          menuName: '목차',
          parentMenuId: null,
          menuUrl: '/lxp/guide',
          menuDepth: 1,
          menuOrder: 0,
          isActive: true,
          requireLogin: true,
          menuType: 'PAGE',
          isNavigation: true,
          menuIcon: 'book-open',
          isDeleted: false,
          createdDate: '2025-07-14T13:00:59',
          lastModifiedDate: '2025-07-14T13:02:02',
        },
        {
          id: 2,
          homepageType: 'ADMIN',
          menuName: '공통 컴포넌트 패키지',
          parentMenuId: null,
          menuUrl: null,
          menuDepth: 1,
          menuOrder: 0,
          isActive: true,
          requireLogin: true,
          menuType: 'FOLDER',
          isNavigation: true,
          menuIcon: 'category',
          isDeleted: false,
          createdDate: '2025-07-14T13:00:59',
          lastModifiedDate: '2025-07-14T13:02:02',
          _children: [
            {
              id: 2,
              homepageType: 'ADMIN',
              menuName: '@wbsoft/ui-overlay',
              parentMenuId: 1,
              menuUrl: '/common-package/ui-overlay',
              menuDepth: 2,
              menuOrder: 1,
              isActive: true,
              requireLogin: true,
              menuType: 'PAGE',
              isNavigation: true,
              menuIcon: 'pencil',
              isDeleted: false,
              createdDate: '2025-07-14T13:10:40',
              lastModifiedDate: '2025-07-17T08:54:55',
              _children: [],
            },
            {
              id: 3,
              homepageType: 'ADMIN',
              menuName: '@wbsoft/ui-layout',
              parentMenuId: 1,
              menuUrl: '/common-package/ui-layout',
              menuDepth: 2,
              menuOrder: 0,
              isActive: true,
              requireLogin: true,
              menuType: 'PAGE',
              isNavigation: true,
              menuIcon: 'pencil',
              isDeleted: false,
              createdDate: '2025-07-14T13:10:40',
              lastModifiedDate: '2025-07-17T08:54:55',
            },
          ],
        },
      ];

      return {
        success: true,
        data: menuList,
        message: '메뉴 목록을 성공적으로 조회했습니다.',
      };
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed',
      });
    }
  } catch (error) {
    console.error('메뉴 목록 조회 중 오류 발생:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});

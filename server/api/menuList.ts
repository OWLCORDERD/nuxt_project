export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const menuList = [
        {
          id: 1,
          homepageType: 'ADMIN',
          menuName: '오버레이 UI (Overlay UI)',
          parentMenuId: 1,
          menuUrl: '/lxp/guide/overlay-ui',
          menuDepth: 2,
          menuOrder: 1,
          isActive: true,
          requireLogin: true,
          menuType: 'PAGE',
          isNavigation: true,
          menuIcon: 'folder',
          isDeleted: false,
          createdDate: '2025-07-14T13:10:40',
          lastModifiedDate: '2025-07-17T08:54:55',
          _children: [],
        },
        {
          id: 2,
          homepageType: 'ADMIN',
          menuName: '관리자 레이아웃 (layout)',
          parentMenuId: 1,
          menuUrl: '/common-package/ui-layout',
          menuDepth: 2,
          menuOrder: 0,
          isActive: true,
          requireLogin: true,
          menuType: 'PAGE',
          isNavigation: true,
          menuIcon: 'folder',
          isDeleted: false,
          createdDate: '2025-07-14T13:10:40',
          lastModifiedDate: '2025-07-17T08:54:55',
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

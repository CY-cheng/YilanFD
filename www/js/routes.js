routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/mapall/',
    url: './pages/mapall.html',
  },
  {
    path: '/ar/',
    url: './pages/ar.html',
  },
  {
    path: '/Introduction/',
    url: './pages/Introduction.html',
  },
  {
    path: '/arworld/',
    url: './pages/arworld.html',
  },
  {
    path: '/detail/:detailId/',
    url: './pages/detail.html',
    on: {
      pageBeforeIn: function (event, page) {
      },
      pageAfterIn: function (event, page) {
      },
      pageInit: function (event, page) {        
      },
      pageBeforeRemove: function (event, page) {
      },
    }
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '(.*)',
    url: './pages/404.html',
  },
  

];

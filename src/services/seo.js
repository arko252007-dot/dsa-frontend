/**
 * SEO Manager for DSA with C
 * Handles dynamic document titles, meta descriptions, keywords, canonical URLs,
 * OpenGraph, Twitter Cards, and Schema.org JSON-LD structured data per route.
 */

const BASE_URL = 'https://dsa-with-c.vercel.app';
const DEFAULT_BANNER = `${BASE_URL}/banner.png`;

const ROUTE_SEO = {
  '/': {
    title: 'DSA with C — Practice DSA in C with Live Algorithm Visualizers | Tree, Hanoi, Sorting, Graphs',
    description: 'Master Data Structures and Algorithms in C (DSA with C). Interactive algorithm visualizers for Binary Search Trees (BST), Tower of Hanoi recursion, Sorting algorithms, Linked Lists, Graphs BFS/DFS, and Hash Tables. Practice 131+ curated C DSA coding problems.',
    keywords: 'DSA, DSA with C, C DSA, DSA in C, Data Structures and Algorithms in C, C programming DSA, learn DSA in C, C algorithm visualizer, tree visualization, tree visualizer, binary search tree visualizer, tower of hanoi, tower of hanoi visualization, tower of hanoi visualizer, sorting visualizer, linked list visualizer, graph visualizer, hashing visualizer, C dry run execution, LeetCode in C',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    schemaType: 'WebSite'
  },
  '/visualizations': {
    title: 'Algorithm Visualizers & Dry-Run Simulators in C — DSA with C',
    description: 'Interactive algorithm visualizers for Sorting, Linked Lists, Binary Search Trees, Tower of Hanoi Recursion, Graph BFS/DFS, and Hash Tables with real-time C memory and dry-run execution.',
    keywords: 'algorithm visualizer, C algorithm visualizer, data structure visualizer, tree visualizer, tree visualization, tower of hanoi visualizer, tower of hanoi visualization, sorting visualizer, linked list visualizer, graph visualizer, hashing visualizer, DSA visualizers in C',
    canonical: `${BASE_URL}/visualizations`,
    ogType: 'website',
    schemaType: 'CollectionPage'
  },
  '/visualizer/tree': {
    title: 'Binary Search Tree (BST) Visualizer & Tree Traversals in C — DSA with C',
    description: 'Interactive Tree Visualization & Binary Search Tree (BST) simulator. Step-by-step tree insertion, search, and Inorder, Preorder, Postorder traversals with live C dry-run code.',
    keywords: 'tree visualization, tree visualizer, binary search tree visualizer, BST visualizer, BST visualization, tree traversal visualizer, inorder preorder postorder traversal in C, binary search tree in C, binary tree visualizer',
    canonical: `${BASE_URL}/visualizer/tree`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Binary Search Tree (BST) Visualizer',
    visualizerDesc: 'Step-by-step Binary Search Tree insertions, deletions, and Inorder, Preorder, Postorder traversals with C dry-run execution.'
  },
  '/visualizer/hanoi': {
    title: 'Tower of Hanoi Visualizer & Recursion Simulator in C — DSA with C',
    description: 'Interactive Tower of Hanoi visualization and recursion solver. Step through recursive disk movements, call stack activation records, and C source code dry run in optimal 2^N - 1 moves.',
    keywords: 'tower of hanoi, tower of hanoi visualization, tower of hanoi visualizer, tower of hanoi in C, recursion visualizer, recursion call stack visualizer, tower of hanoi algorithm simulator, divide and conquer C, 3 disks 4 disks 5 disks hanoi',
    canonical: `${BASE_URL}/visualizer/hanoi`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Tower of Hanoi Recursion Visualizer',
    visualizerDesc: 'Divide-and-conquer recursion solver displaying optimal disk moves, call stack frames, and recursive C execution dry run.'
  },
  '/visualizer/sorting': {
    title: 'Sorting Algorithm Visualizer in C (Bubble, Selection, Insertion, Merge, Quick Sort) — DSA with C',
    description: 'Interactive sorting visualizer for Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort with side-by-side array animations and real-time C dry-run execution.',
    keywords: 'sorting visualizer, sorting algorithm visualizer, sorting visualization, bubble sort visualizer, merge sort visualizer, quick sort visualizer, insertion sort visualizer, selection sort visualizer, sorting algorithms in C',
    canonical: `${BASE_URL}/visualizer/sorting`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Sorting Algorithms Visualizer',
    visualizerDesc: 'Interactive dry-run visualizer for Bubble, Selection, Insertion, Merge, and Quick sort algorithms in C.'
  },
  '/visualizer/linked-list': {
    title: 'Linked List Visualizer in C (Singly, Doubly, Circular) — DSA with C',
    description: 'Interactive linked list visualizer demonstrating pointer mutations, head/tail/position insertions, and deletions in Singly, Doubly, and Circular Linked Lists in C.',
    keywords: 'linked list visualizer, linked list visualization, singly linked list visualizer, doubly linked list visualizer, circular linked list visualizer, C pointer visualizer, linked list memory in C',
    canonical: `${BASE_URL}/visualizer/linked-list`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Linked List Visualizer',
    visualizerDesc: 'Singly, Doubly, and Circular Linked List pointer transition and memory allocation visualizer in C.'
  },
  '/visualizer/graph': {
    title: 'Graph Traversal Visualizer in C (BFS & DFS) — DSA with C',
    description: 'Interactive Graph Visualizer with custom vertex/edge canvas. Trace Queue-based Breadth-First Search (BFS) and Stack-based Depth-First Search (DFS) traversals step-by-step.',
    keywords: 'graph visualizer, graph visualization, graph traversal visualizer, BFS visualizer, DFS visualizer, breadth first search visualization, depth first search visualization, graph algorithms in C',
    canonical: `${BASE_URL}/visualizer/graph`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Graph Traversal (BFS & DFS) Visualizer',
    visualizerDesc: 'Custom vertex & edge graph canvas with step-by-step Queue BFS and Stack DFS traversal visualization.'
  },
  '/visualizer/hashing': {
    title: 'Hash Table & Linear Probing Visualizer in C — DSA with C',
    description: 'Interactive Hash Table visualizer with modulo hash functions and linear probing collision resolution simulation in C.',
    keywords: 'hash table visualizer, hashing visualizer, hash table visualization, linear probing visualizer, collision resolution visualizer, hash modulo visualizer C',
    canonical: `${BASE_URL}/visualizer/hashing`,
    ogType: 'article',
    schemaType: 'SoftwareApplication',
    visualizerName: 'Hash Table & Linear Probing Visualizer',
    visualizerDesc: 'Hash modulo function with linear probing collision resolution and slot allocation visualizer in C.'
  },
  '/practice': {
    title: 'Curated C DSA Practice Sheet (131 Problems) — DSA with C',
    description: 'Practice 131 curated Data Structures and Algorithms problems in C categorized by topic with difficulty ratings, LeetCode mappings, progressive hints, and progress tracking.',
    keywords: 'C DSA practice sheet, DSA problems in C, 131 DSA problems, LeetCode C practice, Data Structures practice problems in C, C coding challenges',
    canonical: `${BASE_URL}/practice`,
    ogType: 'website',
    schemaType: 'Course'
  },
  '/privacy': {
    title: 'Privacy Policy — DSA with C',
    description: 'Privacy policy for DSA with C, detailing student data handling and local-first progress storage.',
    keywords: 'DSA with C privacy policy, student data privacy',
    canonical: `${BASE_URL}/privacy`,
    ogType: 'website'
  },
  '/terms': {
    title: 'Terms of Service — DSA with C',
    description: 'Terms of service and usage guidelines for DSA with C educational platform.',
    keywords: 'DSA with C terms of service, platform usage terms',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website'
  }
};

function setMetaTag(selector, attrName, attrValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function updateDynamicSchema(routeConfig, path) {
  let schemaScript = document.getElementById('dynamicRouteSchema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamicRouteSchema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  let schemaData = null;

  if (routeConfig.schemaType === 'SoftwareApplication' && routeConfig.visualizerName) {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': routeConfig.visualizerName,
      'applicationCategory': 'EducationalApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'url': routeConfig.canonical,
      'description': routeConfig.description,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'DSA with C',
        'url': BASE_URL
      }
    };
  } else if (routeConfig.schemaType === 'CollectionPage') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Algorithm Visualizers in C',
      'url': routeConfig.canonical,
      'description': routeConfig.description,
      'hasPart': [
        { '@type': 'WebApplication', 'name': 'Binary Search Tree Visualizer', 'url': `${BASE_URL}/visualizer/tree` },
        { '@type': 'WebApplication', 'name': 'Tower of Hanoi Visualizer', 'url': `${BASE_URL}/visualizer/hanoi` },
        { '@type': 'WebApplication', 'name': 'Sorting Algorithm Visualizer', 'url': `${BASE_URL}/visualizer/sorting` },
        { '@type': 'WebApplication', 'name': 'Linked List Visualizer', 'url': `${BASE_URL}/visualizer/linked-list` },
        { '@type': 'WebApplication', 'name': 'Graph Traversal Visualizer', 'url': `${BASE_URL}/visualizer/graph` },
        { '@type': 'WebApplication', 'name': 'Hash Table Visualizer', 'url': `${BASE_URL}/visualizer/hashing` }
      ]
    };
  }

  if (schemaData) {
    schemaScript.textContent = JSON.stringify(schemaData);
  } else {
    schemaScript.textContent = '';
  }
}

export const SeoManager = {
  update(path = '/') {
    const cleanPath = path.replace(/\/$/, '') || '/';
    const config = ROUTE_SEO[cleanPath] || ROUTE_SEO['/'];

    // Title
    document.title = config.title;

    // Standard Meta
    setMetaTag('meta[name="title"]', 'name', 'title', config.title);
    setMetaTag('meta[name="description"]', 'name', 'description', config.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', config.keywords);
    setCanonical(config.canonical);

    // OpenGraph Meta
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', config.canonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', config.ogType || 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', DEFAULT_BANNER);

    // Twitter Card Meta
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', config.canonical);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_BANNER);

    // Dynamic Route Schema.org JSON-LD
    updateDynamicSchema(config, cleanPath);
  }
};


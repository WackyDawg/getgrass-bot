require('colors');
const axios = require('axios');
const fs = require('fs');

const PROXY_SOURCES = {
  'SERVER 1': 'https://raw.githubusercontent.com/WackyDawg/getgrass-bot/refs/heads/main/proxy.txt',
  'SERVER 2': 'https://raw.githubusercontent.com/monosans/proxy-list/refs/heads/main/proxies_anonymous/all.txt',
  'SERVER 3': 'https://files.ramanode.top/airdrop/grass/server_3.txt',
  'SERVER 4': 'https://files.ramanode.top/airdrop/grass/server_4.txt',
  'SERVER 5': 'https://files.ramanode.top/airdrop/grass/server_5.txt',
  'SERVER 6': 'https://files.ramanode.top/airdrop/grass/server_6.txt',
};

// Default configuration
const DEFAULT_SOURCE = {
  type: 'url', 
  source: PROXY_SOURCES['SERVER 1'], // Replace with 'proxy.txt' if using a file, or null for no proxy
};

async function fetchProxies(url) {
  try {
    const response = await axios.get(url);
    console.log(`\nFetched proxies from ${url}`.green);
    return response.data.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`Failed to fetch proxies from ${url}: ${error.message}`.red);
    return [];
  }
}

async function readLines(filename) {
  try {
    const data = await fs.promises.readFile(filename, 'utf-8');
    console.log(`Loaded data from ${filename}`.green);
    return data.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`Failed to read ${filename}: ${error.message}`.red);
    return [];
  }
}

async function selectProxySource() {
  const { type, source } = DEFAULT_SOURCE;

  if (type === 'file') {
    console.log(`Using proxies from file: ${source}`.cyan);
    return { type, source };
  } else if (type === 'none') {
    console.log('No proxy will be used.'.cyan);
    return { type };
  }

  console.log(`Using proxies from URL: ${source}`.cyan);
  return { type, source };
}

module.exports = { fetchProxies, readLines, selectProxySource };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import gaze from 'gaze';
import Promise from 'bluebird';
import fs from './lib/fs';
import pkg from '../package.json';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('node_modules/bootstrap/dist/css', 'grails-app/assets/stylesheets'),
    ncp('node_modules/bootstrap/dist/fonts', 'grails-app/assets/fonts'),
    ncp('src/main/js/public', 'grails-app/assets'),
  ]);
  await Promise.all([
    ncp('src/main/js/components/common/styles', 'grails-app/assets/stylesheets'),
  ]);

  await Promise.all([
    ncp('node_modules/font-awesome/css', 'grails-app/assets/stylesheets'),
    ncp('node_modules/font-awesome/fonts', 'grails-app/assets/fonts'),
  ]);

  await Promise.all([
    ncp('node_modules/bootstrap-social/bootstrap-social.css',
    'grails-app/assets/stylesheets/bootstrap-social.css'),
  ]);

  await fs.writeFile('./build-node/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js',
    },
  }, null, 2));

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze('src/main/js/content/**/*.*', (err, val) => err ? reject(err) : resolve(val));
    });

    const cp = async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/main/js/content/').length);
      await ncp(`src/main/js/content/${relPath}`, `build/content/${relPath}`);
    };

    watcher.on('changed', cp);
    watcher.on('added', cp);
  }
}

export default copy;

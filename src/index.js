/*
 * @lydio/megalodom
 * https://alexstevovich.com/a/lydio-megalodom-nodejs
 *
 * Copyright 2015–2025 Alex Stevovich
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MetaTags from '@lydio/meta-tags';
import Schema from '@lydio/schema';
import lydio from 'lydio';

export class LydioMegalodomHtml extends lydio.Tag {
    constructor(lang = 'en-US') {
        super('html');
        this.withAttribute('lang', lang);
        this.head = this.addTag('head');
        this.body = this.addTag('body');
        this.head.meta = this.head.addNode(new MetaTags());
        this.head.styles = this.head.addFragment();
        this.head.scripts = this.head.addFragment();
        this.head.schema = this.head.addNode(new Schema());
        this.body.premain = this.body.addFragment();
        this.body.main = this.body.addTag('main');
        this.body.postmain = this.body.addFragment();
    }
}

export class LydioMegalodomDom extends lydio.Fragment {
    constructor() {
        super();
        this.addDoctype();
        this.html = this.addNode(new LydioMegalodomHtml());
    }

    get schema() {
        return this.html.head.schema;
    }
    get styles() {
        return this.html.head.styles;
    }
    get scripts() {
        return this.html.head.scripts;
    }
    get meta() {
        return this.html.head.meta;
    }

    get head() {
        return this.html.head;
    }

    get body() {
        return this.html.body;
    }

    get main() {
        return this.html.body.main;
    }

    setTitle(title) {
        this.meta.setTitle(title);
        return this;
    }
    setDescription(description) {
        this.meta.setDescription(description);
        return this;
    }
    setCanonical(canonicalUrl) {
        this.meta.setCanonical(canonicalUrl);
        return this;
    }

    addSchema(schema) {
        this.schema.addSchema(schema);
        return this;
    }
}

export { LydioMegalodomDom as Dom, LydioMegalodomHtml as Html };
export default LydioMegalodomDom;

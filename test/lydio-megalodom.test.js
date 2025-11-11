import { describe, it, expect } from 'vitest';
import LydioMegalodom from '../src/index.js';

describe('@lydio/megalodom', () => {
    it('creates a valid root structure with doctype, html, head, and body', () => {
        const doc = new LydioMegalodom();
        const html = doc.toHtml();

        expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
        expect(html).toContain('<html');
        expect(html).toContain('<head>');
        expect(html).toContain('<body>');
    });

    it('includes meta, schema, styles, and scripts sections within head', () => {
        const doc = new LydioMegalodom();
        const html = doc.toHtml();

        expect(doc.head).toBeDefined();
        expect(doc.head.meta).toBeDefined();
        expect(doc.head.schema).toBeDefined();
        expect(doc.head.styles).toBeDefined();
        expect(doc.head.scripts).toBeDefined();

        expect(html).toContain('<meta');

        // scripts fragment should exist but be empty initially
        expect(doc.head.scripts).toBeDefined();
    });

    it('provides fragment accessors for body and main regions', () => {
        const doc = new LydioMegalodom();

        expect(doc.body).toBeDefined();
        expect(doc.main).toBeDefined();
        expect(doc.body.premain).toBeDefined();
        expect(doc.body.postmain).toBeDefined();
    });

    it('sets title, description, and canonical values via helper methods', () => {
        const doc = new LydioMegalodom();

        doc.withTitle('Example Title');
        doc.withDescription('A simple document test.');
        doc.withCanonical('https://example.com/page');

        const html = doc.toHtml();

        expect(html).toContain('<title>Example Title</title>');
        expect(html).toContain(
            'name="description" content="A simple document test."',
        );
        expect(html).toContain(
            '<link rel="canonical" href="https://example.com/page">',
        );
        expect(html).toContain(
            'property="og:url" content="https://example.com/page"',
        );
    });

    it('adds structured data schemas correctly', () => {
        const doc = new LydioMegalodom();

        const schemaData = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Example',
            url: 'https://example.com',
        };

        doc.withSchema(schemaData);
        const html = doc.toHtml();

        expect(html).toContain('"@context":"https://schema.org"');
        expect(html).toContain('"@type":"WebSite"');
        expect(html).toContain('"name":"Example"');
    });

    it('maintains correct DOM order: doctype, html, head, body', () => {
        const doc = new LydioMegalodom();
        const html = doc.toHtml();

        const doctypeIndex = html.indexOf('<!DOCTYPE html>');
        const htmlIndex = html.indexOf('<html');
        const headIndex = html.indexOf('<head>');
        const bodyIndex = html.indexOf('<body>');

        expect(doctypeIndex).toBe(0);
        expect(htmlIndex).toBeGreaterThan(doctypeIndex);
        expect(headIndex).toBeGreaterThan(htmlIndex);
        expect(bodyIndex).toBeGreaterThan(headIndex);
    });

    it('renders valid language attribute on <html> element', () => {
        const doc = new LydioMegalodom();
        const html = doc.toHtml();

        expect(html).toMatch(/<html lang="en-US"/);
    });

    it('returns the same internal objects through getters', () => {
        const doc = new LydioMegalodom();

        expect(doc.meta).toBe(doc.html.head.meta);
        expect(doc.schema).toBe(doc.html.head.schema);
        expect(doc.styles).toBe(doc.html.head.styles);
        expect(doc.scripts).toBe(doc.html.head.scripts);
    });

    it('allows chaining of setters and schema additions', () => {
        const doc = new LydioMegalodom();

        doc.withTitle('Chain Test')
            .withDescription('Chained calls test')
            .withCanonical('https://chain.example.com')
            .withSchema({
                '@context': 'https://schema.org',
                '@type': 'Thing',
                name: 'ChainTest',
            });

        const html = doc.toHtml();
        expect(html).toContain('ChainTest');
        expect(html).toContain('<title>Chain Test</title>');
        expect(html).toContain('https://chain.example.com');
    });

    it('renders without throwing errors when no setters are called', () => {
        const doc = new LydioMegalodom();
        expect(() => doc.toHtml()).not.toThrow();
    });
});

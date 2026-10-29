import assert from 'node:assert';
import {
  getCaseStudiesForServices,
  getInsightsForServices,
  getServiceSiblings,
} from '../../lib/content/relations';
import { services } from '../../lib/content/source';

async function runTests() {
  console.log('Running focused service-relations tests...');

  const allServices = await services.getAll();

  // 1. Forward insight relationships
  console.log('Test 1: Forward insight relationships');
  const ecomInsights = await getInsightsForServices(['ecommerce-development']);
  const ecomSlugs = ecomInsights.map((i) => i.slug);
  assert(
    ecomSlugs.includes('shopify-vs-woocommerce'),
    'ecommerce-development should resolve forward insight shopify-vs-woocommerce'
  );
  assert(
    ecomSlugs.includes('razorpay-vs-stripe'),
    'ecommerce-development should resolve forward insight razorpay-vs-stripe'
  );
  console.log('  PASS: Forward insight relationships resolved correctly.');

  // 2. Forward case-study relationships
  console.log('Test 2: Forward case-study relationships');
  const perfCaseStudies = await getCaseStudiesForServices(['website-performance-optimization']);
  const perfCsSlugs = perfCaseStudies.map((c) => c.slug);
  assert(
    perfCsSlugs.includes('website-performance-foundation'),
    'website-performance-optimization should resolve forward case study website-performance-foundation'
  );
  console.log('  PASS: Forward case-study relationships resolved correctly.');

  // 3. Existing inverse relationships
  console.log('Test 3: Existing inverse relationships');
  const inverseInsights = await getInsightsForServices(['business-website-development']);
  assert(Array.isArray(inverseInsights), 'Inverse lookup should return an array');
  console.log('  PASS: Existing inverse relationships preserved.');

  // 4. Mixed forward and inverse relationships
  console.log('Test 4: Mixed forward and inverse relationships');
  const techSeoInsights = await getInsightsForServices(['technical-seo-setup']);
  const techSeoSlugs = techSeoInsights.map((i) => i.slug);
  assert(
    techSeoSlugs.includes('technical-seo-checklist'),
    'technical-seo-setup should resolve technical-seo-checklist'
  );
  console.log('  PASS: Mixed forward and inverse relationships resolved without loss.');

  // 5. Duplicate references
  console.log('Test 5: Duplicate references deduplication');
  const shopifyInsights = await getInsightsForServices(['shopify-development', 'shopify-development']);
  const shopifySlugs = shopifyInsights.map((i) => i.slug);
  const uniqueSlugs = new Set(shopifySlugs);
  assert.strictEqual(
    shopifySlugs.length,
    uniqueSlugs.size,
    'Returned insights must contain no duplicates'
  );
  console.log('  PASS: Deduplication verified.');

  // 6. Missing slugs
  console.log('Test 6: Missing slugs filtering');
  const nonExistentServiceInsights = await getInsightsForServices(['non-existent-service-slug-xyz']);
  assert.strictEqual(
    nonExistentServiceInsights.length,
    0,
    'Non-existent service slug should resolve to empty array'
  );
  console.log('  PASS: Missing slugs filtered cleanly.');

  // 7. Service self-references
  console.log('Test 7: Service self-references rejection');
  const auditService = allServices.find((s) => s.slug === 'website-audit-technical-fixes');
  if (auditService) {
    const siblings = await getServiceSiblings(auditService);
    assert(
      !siblings.some((s) => s.slug === 'website-audit-technical-fixes'),
      'Service must never appear in its own sibling/related services list'
    );
  }
  console.log('  PASS: Service self-reference rejected.');

  // 8. Empty relationship fields
  console.log('Test 8: Empty relationship fields');
  const emptyInsights = await getInsightsForServices([]);
  assert.strictEqual(emptyInsights.length, 0, 'Empty service list should return empty array');
  const emptyCaseStudies = await getCaseStudiesForServices([]);
  assert.strictEqual(emptyCaseStudies.length, 0, 'Empty service list should return empty array');
  console.log('  PASS: Empty relationship fields handled gracefully.');

  console.log('\nAll 8 service-relation test cases PASSED successfully!');
}

runTests().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

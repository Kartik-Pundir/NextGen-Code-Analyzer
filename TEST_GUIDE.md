# Testing Guide

## Manual Testing Checklist

### Authentication Flow

#### Registration
- [ ] Navigate to `/register`
- [ ] Enter valid name, email, password
- [ ] Click "Create Account"
- [ ] Should redirect to dashboard
- [ ] Token should be stored in localStorage

#### Login
- [ ] Navigate to `/login`
- [ ] Enter valid credentials
- [ ] Click "Sign In"
- [ ] Should redirect to dashboard
- [ ] Token should be stored

#### Logout
- [ ] Click logout button
- [ ] Should redirect to login
- [ ] Token should be removed
- [ ] Cannot access protected routes

### Dashboard

- [ ] Displays correct statistics
- [ ] Shows total analyses count
- [ ] Shows issues count
- [ ] Shows clean files count
- [ ] Shows average complexity
- [ ] Recent analyses displayed (if any)
- [ ] Navigation cards work
- [ ] Navbar highlights Dashboard

### Code Analyzer

#### Input
- [ ] Can enter file name
- [ ] Can select language (JS/JSX/TS)
- [ ] Can paste code
- [ ] "Load Sample" button works
- [ ] Copy button works in editor
- [ ] Line counter updates
- [ ] Analyze button disabled when empty

#### Analysis
- [ ] Click "Analyze Code"
- [ ] Loading state shows
- [ ] Results appear after analysis
- [ ] Metrics display correctly
- [ ] Issues listed with severity colors
- [ ] AI suggestions appear
- [ ] Can analyze multiple times

#### Sample Code Test
```javascript
function test(a,b,c,d,e,f,g) {
  if(a>b) {
    if(c>d) {
      if(e>f) {
        return a;
      }
    }
  }
  let x = 1;
  return x;
}
```

Expected Results:
- Complexity: High
- Issues: Too many parameters, short variable name
- Suggestions: Multiple optimization tips

### History Page

- [ ] Displays all past analyses
- [ ] Shows correct timestamps
- [ ] Displays metrics for each
- [ ] Filter buttons work (All/Issues/Clean)
- [ ] Export button downloads JSON
- [ ] Empty state shows when no history
- [ ] Language badges display correctly

### UI/UX

- [ ] Gradient backgrounds render
- [ ] Hover effects work
- [ ] Animations smooth
- [ ] Cards have proper shadows
- [ ] Buttons have hover states
- [ ] Loading spinners appear
- [ ] Error messages display
- [ ] Empty states show correctly

### Responsive Design

- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation adapts
- [ ] Grid layouts adjust
- [ ] Text remains readable

### Error Handling

- [ ] Invalid login shows error
- [ ] Empty code shows error
- [ ] Network errors handled
- [ ] Token expiration handled
- [ ] 404 pages work

## API Testing

### Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Analyze Code
```bash
curl -X POST http://localhost:5000/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"code":"function test() { return 1; }","fileName":"test.js","language":"javascript"}'
```

#### Get History
```bash
curl http://localhost:5000/api/analysis/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import collection (create from API_DOCUMENTATION.md)
2. Set environment variable for token
3. Test all endpoints
4. Verify responses

## Performance Testing

### Load Test
```bash
# Install Apache Bench
# macOS: brew install httpd

# Test registration endpoint
ab -n 100 -c 10 -p register.json -T application/json \
  http://localhost:5000/api/auth/register

# Test analysis endpoint (with auth)
ab -n 50 -c 5 -p analyze.json -T application/json \
  -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/analysis/analyze
```

### Expected Performance
- Registration: < 200ms
- Login: < 150ms
- Analysis: < 2000ms (with AI)
- History: < 100ms

## Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Database Testing

### MongoDB Queries
```javascript
// Connect to MongoDB
mongosh

// Use database
use nextgen-analyzer

// Check users
db.users.find()

// Check analyses
db.analyses.find()

// Count documents
db.analyses.countDocuments()

// Find by user
db.analyses.find({ userId: ObjectId("...") })
```

## Security Testing

- [ ] Passwords are hashed
- [ ] JWT tokens expire
- [ ] Protected routes require auth
- [ ] SQL injection prevented (N/A - using MongoDB)
- [ ] XSS prevented
- [ ] CORS configured correctly

## Edge Cases

### Authentication
- [ ] Register with existing email
- [ ] Login with wrong password
- [ ] Login with non-existent email
- [ ] Empty form submissions

### Analysis
- [ ] Empty code
- [ ] Very long code (10000+ lines)
- [ ] Invalid syntax
- [ ] Special characters
- [ ] Unicode characters

### History
- [ ] No analyses yet
- [ ] 100+ analyses
- [ ] Filter with no results

## Automated Testing (Future)

### Unit Tests
```javascript
// Example with Jest
describe('AST Analyzer', () => {
  test('detects high complexity', () => {
    const code = 'function test() { if(a) { if(b) { if(c) {} } } }';
    const result = analyzeCode(code, 'javascript');
    expect(result.metrics.complexity).toBeGreaterThan(3);
  });
});
```

### Integration Tests
```javascript
// Example with Supertest
describe('POST /api/analysis/analyze', () => {
  test('returns analysis results', async () => {
    const response = await request(app)
      .post('/api/analysis/analyze')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: 'function test() {}', fileName: 'test.js', language: 'javascript' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('metrics');
  });
});
```

## Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 96]
- Node: [e.g. 16.13.0]
```

## Test Data

### Sample Users
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Sample Code Snippets
See `server/utils/codeExamples.js`

## Continuous Testing

- Test after every feature addition
- Test before every commit
- Test before deployment
- Monitor production errors

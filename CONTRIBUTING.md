# Contributing to NextGen Code Analyzer

Thank you for considering contributing to NextGen Code Analyzer! 

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
# Fork and clone
git clone https://github.com/your-username/nextgen-code-analyzer.git
cd nextgen-code-analyzer

# Install dependencies
npm install
cd client && npm install && cd ..

# Create .env file
cp .env.example .env

# Start development
npm run dev
```

### Code Style

- Use ESLint configuration provided
- Follow existing code patterns
- Write clear, descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

### Testing

- Test all new features
- Ensure existing tests pass
- Add tests for bug fixes
- Test on multiple browsers

### Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation
- Include examples for new features

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

## Questions?

Feel free to open an issue for any questions!

Thank you for contributing! 🎉

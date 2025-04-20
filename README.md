# CSV Management Application

A Next.js application for managing car data through CSV files. This application allows users to upload, view, edit, and delete car records stored in a CSV format.

## Features

- Upload CSV files containing car data
- View car records in a table format
- Add new car entries
- Edit existing car records
- Delete car records
- Automatic ID generation for new entries

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd next_csv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
next_csv/
├── app/                    # Next.js app directory
│   ├── page.js            # Home page (Upload form)
│   ├── view/              # View cars page
│   └── add/               # Add car page
├── components/            # React components
│   ├── CarTable.js       # Table component for displaying cars
│   ├── UploadForm.js     # CSV upload form
│   └── AddCarForm.js     # Form for adding new cars
├── lib/                  # Library code
│   └── tableActions.js   # CSV file operations
├── public/               # Static assets
│   └── uploads/         # Directory for uploaded CSV files
└── package.json         # Project dependencies
```

## CSV File Format

The application expects CSV files with the following structure:
```csv
id,brand,model,price
101,Honda,Accord,150
106,Volvo,C30,250
```

Required columns:
- `id`: Unique identifier for each car
- `brand`: Car manufacturer
- `model`: Car model name
- `price`: Car price (numeric value)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development Guidelines

### Code Style
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Use proper error handling

### Git Workflow
1. Create feature branches for new functionality
2. Commit messages should be clear and descriptive
3. Pull requests should be reviewed before merging

### Testing
- Test all CRUD operations
- Verify CSV file handling
- Check error handling scenarios

## Troubleshooting

### Common Issues

1. **CSV Upload Issues**
   - Ensure the CSV file has the correct format
   - Check file permissions in the uploads directory
   - Verify the CSV has the required columns

2. **Dependency Issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Build Issues**
   ```bash
   npm run build
   ```

4. **Development Server Issues**
   ```bash
   npm run dev -- --clear
   ```

## Dependencies

- Next.js 15.2.4
- React 19.0.0
- csv-parse 5.6.0
- TailwindCSS 4

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

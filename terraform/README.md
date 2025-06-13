# Terraform Infrastructure

This directory contains Terraform configuration for deploying the infrastructure needed for the Remix full-stack application.

## Prerequisites

1. **Google Cloud Platform Account**
   - Create a GCP project
   - Enable the following APIs:
     - Cloud SQL Admin API
     - Compute Engine API

2. **Terraform CLI**
   ```bash
   # Install Terraform
   curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
   sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
   sudo apt-get update && sudo apt-get install terraform
   ```

3. **Google Cloud CLI**
   ```bash
   # Install gcloud CLI
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

## Setup

1. **Authentication**
   ```bash
   # Authenticate with Google Cloud
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Configure Variables**
   ```bash
   # Copy example variables file
   cp terraform.tfvars.example terraform.tfvars

   # Edit with your values
   vim terraform.tfvars
   ```

3. **Initialize Terraform**
   ```bash
   terraform init
   ```

## Usage

### Plan Infrastructure
```bash
terraform plan
```

### Deploy Infrastructure
```bash
terraform apply
```

### Destroy Infrastructure
```bash
terraform destroy
```

## Resources Created

- **Cloud SQL PostgreSQL Instance**: Managed PostgreSQL database
- **Database**: Application database
- **Database User**: Application database user with generated password

## Configuration

### Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `project_id` | GCP project ID | *required* |
| `region` | GCP region | `us-central1` |
| `environment` | Environment name | `dev` |
| `app_name` | Application name | `remix-app` |
| `database_tier` | Database instance tier | `db-f1-micro` |

### Environment-specific Configurations

For different environments, create separate `.tfvars` files:

```bash
# Development
terraform apply -var-file="dev.tfvars"

# Staging
terraform apply -var-file="staging.tfvars"

# Production
terraform apply -var-file="prod.tfvars"
```

### Outputs

After deployment, Terraform outputs:
- Database connection name
- Database IP address
- Database URL (sensitive)

To view outputs:
```bash
terraform output
terraform output -json
terraform output database_url
```

## Integration with Application

After deploying infrastructure:

1. **Get Database URL**
   ```bash
   export DATABASE_URL=$(terraform output -raw database_url)
   ```

2. **Update Environment Variables**
   ```bash
   # Add to your .env file
   echo "DATABASE_URL=$DATABASE_URL" >> .env
   ```

3. **Run Database Migrations**
   ```bash
   yarn db:migrate
   ```

## Security Considerations

- **Database Access**: Currently allows all IPs (0.0.0.0/0) for simplicity
- **Production**: Restrict to specific IPs or use Cloud SQL Proxy
- **Credentials**: Database password is randomly generated and stored in Terraform state
- **State Management**: Consider using remote state storage for production

## Advanced Configuration

### Remote State Storage

For production, use remote state:

```hcl
terraform {
  backend "gcs" {
    bucket = "your-terraform-state-bucket"
    prefix = "terraform/state"
  }
}
```

### VPC and Private Networking

For enhanced security, configure private networking:

```hcl
resource "google_compute_network" "main" {
  name = "${var.app_name}-${var.environment}"
}

resource "google_compute_subnetwork" "main" {
  name          = "${var.app_name}-${var.environment}"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.region
  network       = google_compute_network.main.id
}
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Ensure you have the necessary IAM roles
   - Required roles: Cloud SQL Admin, Compute Admin

2. **API Not Enabled**
   ```bash
   gcloud services enable sqladmin.googleapis.com
   gcloud services enable compute.googleapis.com
   ```

3. **Database Connection Issues**
   - Check firewall rules
   - Verify database instance is running
   - Ensure correct connection string format

### Useful Commands

```bash
# Check Terraform version
terraform version

# Validate configuration
terraform validate

# Format configuration
terraform fmt

# Show current state
terraform show

# List resources
terraform state list
```

## Cost Optimization

- Use `db-f1-micro` for development (included in free tier)
- Use `db-custom-1-3840` for production
- Enable deletion protection for production databases
- Set up automated backups with appropriate retention

## Next Steps

1. Set up monitoring and alerting
2. Configure automated backups
3. Implement database connection pooling
4. Add Redis for caching
5. Set up CDN for static assets

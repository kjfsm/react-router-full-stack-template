# Cloud SQL PostgreSQL instance
resource "google_sql_database_instance" "main" {
  name             = "${var.app_name}-${var.environment}"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = var.database_tier
    
    backup_configuration {
      enabled    = true
      start_time = "03:00"
    }

    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0"
      }
    }

    database_flags {
      name  = "cloudsql.iam_authentication"
      value = "on"
    }
  }

  deletion_protection = var.environment == "prod" ? true : false
}

# Database
resource "google_sql_database" "main" {
  name     = "${var.app_name}_${var.environment}"
  instance = google_sql_database_instance.main.name
}

# Database user
resource "google_sql_user" "main" {
  name     = "${var.app_name}_user"
  instance = google_sql_database_instance.main.name
  password = random_password.db_password.result
}
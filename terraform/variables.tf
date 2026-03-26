variable "aws_region" {
  description = "AWS region for the EKS cluster"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "cloudcost-wise-eks"
}

variable "cluster_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.32" 
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}
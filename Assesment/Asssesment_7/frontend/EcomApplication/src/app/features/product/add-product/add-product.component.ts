import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ToaterService } from '../../../core/services/toater.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  products: any[] = [];
  productService = inject(ProductService);
  toasterService = inject(ToaterService);

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.productForm = this.fb.group({
      PrName: [''],
      PrCategory: [''],
      PrBrand: [''],
      SellingPrice: [''],
      PurchasePrice: [''],
      PurchaseDate: [''],
      Stock: [''],
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log('productResponse', response);
        if (response.status === 200) {
          this.products = response.product;
          console.log('productResponse2', this.products);
        } else {
          console.error('Error fetching products:', response.message);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  openModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitProduct() {
    if (this.productForm.invalid || !this.selectedFile) {
      this.toasterService.showError(
        'Please fill all required fields and upload an image.'
      );
      return;
    }

    const formData = new FormData();
    formData.append('PrName', this.productForm.value.PrName);
    formData.append('PrCategory', this.productForm.value.PrCategory);
    formData.append('PrBrand', this.productForm.value.PrBrand);
    formData.append('SellingPrice', this.productForm.value.SellingPrice);
    formData.append('PurchasePrice', this.productForm.value.PurchasePrice);
    formData.append('PurchaseDate', this.productForm.value.PurchaseDate);
    formData.append('Stock', this.productForm.value.Stock);
    formData.append('PrImageFile', this.selectedFile!);

    // Pass `formData` to the service instead of `this.productForm`
    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        console.log('productresponse', response);
        if (response.status == 200) {
          this.toasterService.showSuccess('Product Added Successfully');
          this.productForm.reset(); // Optional: Reset the form after successful submission
          this.selectedFile = null; // Clear the file selection
        } else {
          this.toasterService.showError('Unable to add Product');
        }
      },
      (error) => {
        console.error('Error adding product:', error);
        this.toasterService.showError('Unable to get response');
      }
    );
  }
  deleteProduct(id: number) {}
  editProduct(id: number) {}
}

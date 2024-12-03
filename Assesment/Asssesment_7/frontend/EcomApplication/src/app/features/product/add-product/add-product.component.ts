import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { ToaterService } from '../../../core/services/toater.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../auth/utility/navbar/navbar.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  products: any[] = [];
  productId: number = 0;
  isupdate: boolean = false;
  productService = inject(ProductService);
  toasterService = inject(ToaterService);
  selectedProduct: any = null;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.productForm = this.fb.group({
      prName: [''],
      prCategory: [''],
      profileImage: new FormControl<File | null>(null),
      prBrand: [''],
      sellingPrice: [''],
      purchasePrice: [''],
      purchaseDate: [''],
      stock: [''],
    });
  }
  ngOnInit(): void {
    this.getAllProducts();

    // this.productId = this.products[0].prId;
  }
  // openEditModal(product: any): void {
  //   this.products = product;

  //   this.productForm.patchValue({
  //     PrName: product.prName,
  //     PrCategory: product.prCategory,
  //     PrBrand: product.prBrand,
  //     SellingPrice: product.sellingPrice,
  //     PurchasePrice: product.purchasePrice,
  //     PurchaseDate: product.purchaseDate,
  //     Stock: product.stock,
  //   });
  //   // Open the modal (use Bootstrap modal methods)
  //   // ('#editProductModal').modal('show');
  // }

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

  updateModal(product: any) {
    console.log('product', product);
    this.isupdate = true;
    console.log('productValue', this.productForm);
    this.productForm.patchValue(product);
    // this.productForm.get('PrName')?.setValue(product.pr)
    // this.productForm.get()
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

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Store the file for uploading
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

    // Append form values to FormData
    Object.keys(this.productForm.value).forEach((key) => {
      formData.append(key, this.productForm.value[key]);
    });
    console.log('fromdata', formData);
    // formData.append('PrImageFile', this.selectedFile);

    // Pass `formData` to the service instead of `this.productForm`
    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        console.log('productresponse', response);
        if (response.status == 200) {
          this.toasterService.showSuccess('Product Added Successfully');
          this.getAllProducts();
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
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.productService.deleteProducts(id).subscribe(
        (response) => {
          console.log('login response', response);
          if (response.status == 200) {
            this.toasterService.showSuccess('Product Delete Successfuuly');
            this.getAllProducts();
          } else {
            this.toasterService.showError('Unable to delete');
          }
        },
        (error) => {
          this.toasterService.showError('Unable to get response');
        }
      );
    }
  }
  editProduct() {
    const formData = new FormData();

    // Append form values to FormData
    Object.keys(this.productForm.value).forEach((key) => {
      formData.append(key, this.productForm.value[key]);
    });
    console.log('fromdata', formData);
    if (this.selectedFile) {
      formData.append(
        'profileImage',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    this.productService.updateProducts(formData).subscribe(
      (response: any) => {
        console.log('update respnse', response);
        if ((response.status = 200)) {
          console.log('update respnse', response);
          this.toasterService.showWarning('Product updateded successfully');
          this.getAllProducts();
        } else {
          this.toasterService.showError('Errror in updated the product');
        }
      },
      (error) => {
        this.toasterService.showError('unable to get the response');
      }
    );
  }

  //*****view product section******//
  viewProduct(product: any): void {
    this.selectedProduct = product;
    console.log('selectedProduct', this.selectedProduct);
    const modal = document.getElementById('viewProductModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeViewModal(): void {
    const modal = document.getElementById('viewProductModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
    this.selectedProduct = null; // Clear the selected product when closing the modal
  }
}

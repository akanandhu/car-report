import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { VehicleUtilsService } from './service/vehicle.utils.service';
import { VehicleRepository } from './repository/vehicle.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class SharedVehicleService {
  private readonly vehicleRepository: VehicleRepository;

  constructor(
    private readonly vehicleUtilsService: VehicleUtilsService,
    private readonly prisma: PrismaService,
  ) {
    this.vehicleRepository = new VehicleRepository(prisma);
  }

  /**
   * Create a new vehicle
   */
  async create(data: {
    name: string;
    vehicleNumber: string;
    status: string;
    model: string;
    createdBy?: string;
  }) {
    // Check if vehicle number already exists
    const existingVehicle = await this.vehicleRepository.findOne({
      where: { vehicleNumber: data.vehicleNumber },
    });

    if (existingVehicle) {
      throw new ConflictException('Vehicle number already exists');
    }

    // Create vehicle
    const vehicle = await this.vehicleRepository.create({
      name: data.name,
      vehicleNumber: data.vehicleNumber,
      status: data.status,
      model: data.model,
      createdBy: data.createdBy,
    });

    return vehicle;
  }

  /**
   * Update vehicle information
   */
  async update(
    vehicleId: string,
    data: {
      name?: string;
      vehicleNumber?: string;
      status?: string;
      model?: string;
      lastModifiedBy?: string;
    },
  ) {
    // Check if vehicle exists
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // If vehicle number is being updated, check if it already exists
    if (data.vehicleNumber && data.vehicleNumber !== vehicle.vehicleNumber) {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: { vehicleNumber: data.vehicleNumber },
      });

      if (existingVehicle) {
        throw new ConflictException('Vehicle number already exists');
      }
    }

    // Update vehicle
    const updatedVehicle = await this.vehicleRepository.updateById(vehicleId, data);

    return updatedVehicle;
  }

  /**
   * Find vehicle by ID
   */
  async findById(vehicleId: string) {
    const vehicle = await this.vehicleRepository.findById(vehicleId, {
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modifier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  /**
   * List vehicles with pagination
   */
  async list(params: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null, // Only non-deleted vehicles
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { vehicleNumber: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { status: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count
    const total = await this.vehicleRepository.count(where);

    // Get vehicles
    const vehicles = await this.vehicleRepository.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modifier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);

    return {
      data: vehicles,
      pagination: {
        currentPage: page,
        perPage: limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  /**
   * Soft delete a vehicle
   */
  async delete(vehicleId: string) {
    // Check if vehicle exists
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Soft delete the vehicle
    // Soft delete the vehicle
    await this.vehicleRepository.softDeleteById(vehicleId);

    return { message: 'Vehicle deleted successfully' };
  }

  /**
   * Find vehicle by ID with documents
   */
  async findByIdWithDocuments(vehicleId: string) {
    const vehicle = await this.vehicleRepository.findById(vehicleId, {
      include: {
        vehicleDocuments: {
          include: {
            documentGroup: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modifier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }
}

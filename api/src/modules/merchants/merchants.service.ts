import { Injectable } from '@nestjs/common'
import { Merchant } from './merchants.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InputError } from '../../errors/InputError'
import { MerchantErrors } from '../../types/Errors/MerchantErrors'

type CreateMerchantInput = Pick<Merchant, 'name' | 'reseller'>

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant) private merchantRepo: Repository<Merchant>,
  ) {}

  async getAll(): Promise<Merchant[]> {
    return await this.merchantRepo.find()
  }

  async getById(id: string): Promise<Merchant> {
    return await this.merchantRepo.findOne(id, {
      relations: ['reseller'],
    })
  }

  async getByReseller(resellerId: string): Promise<Merchant[]> {
    return await this.merchantRepo.find({
      reseller: { id: resellerId },
    })
  }

  async merchantExists(params: Partial<Merchant>): Promise<boolean> {
    return (await this.merchantRepo.count(params)) > 0
  }

  async create(input: CreateMerchantInput): Promise<Merchant> {
    if (await this.merchantExists({ name: input.name }))
      throw new InputError(MerchantErrors.ExistingMerchant)

    return await this.merchantRepo.save(this.merchantRepo.create(input))
  }

  async update(id: string, input: Partial<Merchant>): Promise<Merchant> {
    const merchant = await this.getById(id)

    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        merchant[key] = input[key]
      }
    }

    return this.merchantRepo.save(merchant)
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientTemplateUtilsService } from './service/client-template.utils.service';
import { ClientTemplateRepository } from './repository/client-template.repository';

@Injectable()
export class SharedClientTemplateService {
  constructor(
    private readonly clientTemplateUtilsService: ClientTemplateUtilsService,
    private readonly clientTemplateRepository: ClientTemplateRepository,
  ) {}

  async upsertClientTemplate(clientId: string, pdfTemplateId: string) {
    const existing = await this.clientTemplateRepository.findFirst({
        where: { clientId }
    });

    if (existing) {
        return this.clientTemplateRepository.update({
            where: { id: existing.id },
            data: { pdfTemplateId }
        });
    }

    return this.clientTemplateRepository.create({
        clientId,
        pdfTemplateId
    });
  }

  async listByClientId(clientId: string) {
    return this.clientTemplateRepository.findMany({
        where: { clientId }
    });
  }
}

import prisma from "@/lib/prisma";
import { getAllTemplates } from "../fetchers";

class TemplateApiService {
  /**
   * Get all templates
   * @returns List of templates
   */
  public async getAll() {
    return getAllTemplates();
  }
}
const TemplateApi = new TemplateApiService();
export default TemplateApi;

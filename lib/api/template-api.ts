import prisma from "@/lib/prisma";

class TemplateApiService {
  /**
   * Get all templates
   * @returns List of templates
   */
  public async getAll() {
    try {
      const templates = await prisma.template.findMany();
      return templates;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  /**
   * Get template
   * @params id
   * @returns template
   */
  //   public async get(id: string) {}
}
const TemplateApi = new TemplateApiService();
export default TemplateApi;
